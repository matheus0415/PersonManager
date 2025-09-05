using Microsoft.EntityFrameworkCore;
using PersonManage.Data;
using PersonManage.Models;

namespace PersonManage.Repositories
{
    public class PersonRepository : IPersonRepository
    {
        private readonly AppDbContext _context;
        public PersonRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Person>> GetAllAsync()
        {
            return await _context.Persons.ToListAsync();
        }

        public async Task<Person?> GetByIdAsync(int id)
        {
            return await _context.Persons.FindAsync(id);
        }

        public async Task<Person> AddAsync(Person person)
        {
            _context.Persons.Add(person);
            await _context.SaveChangesAsync();
            return person;
        }

        public async Task UpdateAsync(Person person)
        {
            _context.Persons.Update(person);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Person person)
        {
            _context.Persons.Remove(person);
            await _context.SaveChangesAsync();
        }
    }
}
