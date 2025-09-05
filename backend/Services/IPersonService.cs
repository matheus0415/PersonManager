using PersonManage.Models;

namespace PersonManage.Services
{
    public interface IPersonService
    {
        Task<IEnumerable<PersonDto>> GetAllAsync();
        Task<PersonDto?> GetByIdAsync(int id);
        Task<PersonDto> AddAsync(CreatePersonDto dto);
        Task<bool> UpdateAsync(int id, UpdatePersonDto dto);
        Task<bool> DeleteAsync(int id);
    }
}
