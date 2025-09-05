using PersonManage.Models;

namespace PersonManage.Repositories
{
    public interface IPersonRepository
    {
        Task<IEnumerable<Person>> GetAllAsync();
        Task<Person?> GetByIdAsync(int id);
        Task<Person> AddAsync(Person person);
        Task UpdateAsync(Person person);
        Task DeleteAsync(Person person);
    }
}
