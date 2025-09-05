using PersonManage.Models;
using PersonManage.Repositories;

namespace PersonManage.Services
{
    public class PersonService : IPersonService
    {
        private readonly IPersonRepository _repository;
        public PersonService(IPersonRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<PersonDto>> GetAllAsync()
        {
            var persons = await _repository.GetAllAsync();
            return persons.Select(p => new PersonDto
            {
                Id = p.Id,
                Name = p.Name,
                Gender = p.Gender,
                Email = p.Email,
                BirthDate = p.BirthDate,
                PlaceOfBirth = p.PlaceOfBirth,
                Nationality = p.Nationality,
                CPF = p.CPF,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt
            });
        }

        public async Task<PersonDto?> GetByIdAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id);
            if (person == null) return null;
            return new PersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Gender = person.Gender,
                Email = person.Email,
                BirthDate = person.BirthDate,
                PlaceOfBirth = person.PlaceOfBirth,
                Nationality = person.Nationality,
                CPF = person.CPF,
                CreatedAt = person.CreatedAt,
                UpdatedAt = person.UpdatedAt
            };
        }

        public async Task<PersonDto> AddAsync(CreatePersonDto dto)
        {
            // Validações obrigatórias
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Nome é obrigatório.");
            if (string.IsNullOrWhiteSpace(dto.CPF))
                throw new ArgumentException("CPF é obrigatório.");
            if (!IsValidCPF(dto.CPF))
                throw new ArgumentException("CPF inválido.");
            if (await CpfExists(dto.CPF))
                throw new ArgumentException("CPF já cadastrado.");
            if (dto.BirthDate == default)
                throw new ArgumentException("Data de nascimento é obrigatória.");
            if (dto.BirthDate > DateTime.UtcNow)
                throw new ArgumentException("Data de nascimento não pode ser futura.");
            if (!string.IsNullOrWhiteSpace(dto.Email) && !IsValidEmail(dto.Email))
                throw new ArgumentException("E-mail inválido.");

            var now = DateTime.UtcNow;
            var person = new Person
            {
                Name = dto.Name,
                Gender = dto.Gender,
                Email = dto.Email,
                BirthDate = dto.BirthDate,
                PlaceOfBirth = dto.PlaceOfBirth,
                Nationality = dto.Nationality,
                CPF = dto.CPF,
                CreatedAt = now,
                UpdatedAt = now
            };
            var created = await _repository.AddAsync(person);
            return new PersonDto
            {
                Id = created.Id,
                Name = created.Name,
                Gender = created.Gender,
                Email = created.Email,
                BirthDate = created.BirthDate,
                PlaceOfBirth = created.PlaceOfBirth,
                Nationality = created.Nationality,
                CPF = created.CPF,
                CreatedAt = created.CreatedAt,
                UpdatedAt = created.UpdatedAt
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdatePersonDto dto)
        {
            var person = await _repository.GetByIdAsync(id);
            if (person == null) return false;
            if (string.IsNullOrWhiteSpace(dto.Name))
                throw new ArgumentException("Nome é obrigatório.");
            if (string.IsNullOrWhiteSpace(dto.CPF))
                throw new ArgumentException("CPF é obrigatório.");
            if (!IsValidCPF(dto.CPF))
                throw new ArgumentException("CPF inválido.");
            if (await CpfExists(dto.CPF, id))
                throw new ArgumentException("CPF já cadastrado.");
            if (dto.BirthDate == default)
                throw new ArgumentException("Data de nascimento é obrigatória.");
            if (dto.BirthDate > DateTime.UtcNow)
                throw new ArgumentException("Data de nascimento não pode ser futura.");
            if (!string.IsNullOrWhiteSpace(dto.Email) && !IsValidEmail(dto.Email))
                throw new ArgumentException("E-mail inválido.");

            person.Name = dto.Name;
            person.Gender = dto.Gender;
            person.Email = dto.Email;
            person.BirthDate = dto.BirthDate;
            person.PlaceOfBirth = dto.PlaceOfBirth;
            person.Nationality = dto.Nationality;
            person.CPF = dto.CPF;
            person.UpdatedAt = DateTime.UtcNow;
            await _repository.UpdateAsync(person);
            return true;
        }
        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private bool IsValidCPF(string cpf)
        {
            // Remove caracteres não numéricos
            cpf = new string(cpf.Where(char.IsDigit).ToArray());
            if (cpf.Length != 11) return false;
            if (cpf.All(c => c == cpf[0])) return false;
            int[] mult1 = { 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            int[] mult2 = { 11, 10, 9, 8, 7, 6, 5, 4, 3, 2 };
            string tempCpf = cpf.Substring(0, 9);
            int sum = 0;
            for (int i = 0; i < 9; i++)
                sum += int.Parse(tempCpf[i].ToString()) * mult1[i];
            int rest = sum % 11;
            int digit = rest < 2 ? 0 : 11 - rest;
            tempCpf += digit;
            sum = 0;
            for (int i = 0; i < 10; i++)
                sum += int.Parse(tempCpf[i].ToString()) * mult2[i];
            rest = sum % 11;
            digit = rest < 2 ? 0 : 11 - rest;
            return cpf.EndsWith(digit.ToString());
        }

        private async Task<bool> CpfExists(string cpf, int? ignoreId = null)
        {
            var all = await _repository.GetAllAsync();
            return all.Any(p => p.CPF == cpf && (!ignoreId.HasValue || p.Id != ignoreId.Value));
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var person = await _repository.GetByIdAsync(id);
            if (person == null) return false;
            await _repository.DeleteAsync(person);
            return true;
        }
    }
}
