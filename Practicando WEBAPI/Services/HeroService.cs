using AutoMapper;
using Practicando_WEBAPI.Data.Entities;
using Practicando_WEBAPI.Data.Repository;
using Practicando_WEBAPI.Exceptions;
using Practicando_WEBAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Practicando_WEBAPI.Services
{
    public class HeroService : IHeroService
    {
        private IMapper _mapper;
        private ILibraryRepository _libraryRepository;

        public HeroService(IMapper mapper, ILibraryRepository libraryRepository)
        {
            _mapper = mapper;
            _libraryRepository = libraryRepository;
        }
        public async Task<IEnumerable<HeroModel>> GetHeroesAsync(int breedId)
        {
            ValidateBreed(breedId);
            var entityList = await _libraryRepository.GetHeroesAsync(breedId);
            var modelList = _mapper.Map<IEnumerable<HeroModel>>(entityList);
            return modelList;
        }
        public async Task<HeroModel> GetHeroAsync(int breedId, int heroId)
        {
            ValidateBreed(breedId);
            ValidateHero(heroId);
            var hero = await _libraryRepository.GetHeroAsync(heroId);
            if(hero.Breed.Id!= breedId)
            {
                throw new NotFoundException($"The hero with id : {heroId} doesnt exist for the breed {breedId} try it with an existing id.");
            }
            return _mapper.Map<HeroModel>(hero);
        }

        public async Task<HeroModel> CreateHeroAsync(int breedId, HeroModel heroModel)
        {
            ValidateBreed(breedId);
            if (heroModel.BreedId != null && heroModel.BreedId!=breedId)
            {
                throw new BadRequestException($"You cant create the hero with that breed id, try with {breedId}");
            }
            heroModel.BreedId = breedId;
            HeroEntity heroEntity = _mapper.Map<HeroEntity>(heroModel);
            _libraryRepository.CreateHero(heroEntity);
            var res = await _libraryRepository.SaveChangesAsync();
            if (res)
            {
                return _mapper.Map<HeroModel>(heroEntity);
            }
            throw new Exception("Database Exception");

        }

        public async Task<bool> DeleteHeroAsync(int breedId, int heroId)
        { 
            var hero= await GetHeroAsync(breedId, heroId);
            if (hero.BreedId != breedId)
            {
                throw new NotFoundException($"The hero with id : {heroId} doesnt exist for the breed {breedId} try it with an existing id.");
            }
            _libraryRepository.DeleteHero(heroId);
            return true;
        }      

        public async Task<bool> UpdateHeroAsync(int breedId,int heroId,HeroModel heroModel)
        {
            var hero = await GetHeroAsync(breedId, heroId);
            if (hero.BreedId != breedId)
            {
                throw new NotFoundException($"The hero with id : {heroId} doesnt exist for the breed {breedId} try it with an existing id.");
            }
            heroModel.Id = heroId;
            return await _libraryRepository.UpdateHeroAsync(_mapper.Map<HeroEntity>(heroModel));
          
        }
        private async void ValidateBreed(int breedId)
        {
            var breed = await _libraryRepository.GetBreedAsync(breedId);
            if (breed==null)
            {
                throw new NotFoundException($"The breed with id: {breedId} doesnt exist try it with an existing id.");
            }
        }
        private async void ValidateHero(int heroId)
        {
            var hero =await _libraryRepository.GetHeroAsync(heroId);
            if (hero == null)
            {
                throw new NotFoundException($"The hero with id: {heroId} doesnt exist try it with an existing id.");
            }
        }
    }
}
