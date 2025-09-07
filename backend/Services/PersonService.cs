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
            IEnumerable<Person> persons = await _repository.GetAllAsync();
            return persons.Select(p => new PersonDto
            {
                Id = p.Id,
                Name = p.Name,
                Gender = p.Gender,
                Email = p.Email,
                BirthDate = p.BirthDate.Kind == DateTimeKind.Utc ? p.BirthDate : DateTime.SpecifyKind(p.BirthDate.ToUniversalTime(), DateTimeKind.Utc),
                PlaceOfBirth = p.PlaceOfBirth,
                Nationality = p.Nationality,
                CPF = p.CPF,
                CreatedAt = p.CreatedAt.Kind == DateTimeKind.Utc ? p.CreatedAt : DateTime.SpecifyKind(p.CreatedAt.ToUniversalTime(), DateTimeKind.Utc),
                UpdatedAt = p.UpdatedAt.Kind == DateTimeKind.Utc ? p.UpdatedAt : DateTime.SpecifyKind(p.UpdatedAt.ToUniversalTime(), DateTimeKind.Utc)
            });
        }

        public async Task<PersonDto?> GetByIdAsync(int id)
        {
            Person? person = await _repository.GetByIdAsync(id);
            if (person == null) return null;
            return new PersonDto
            {
                Id = person.Id,
                Name = person.Name,
                Gender = person.Gender,
                Email = person.Email,
                BirthDate = person.BirthDate.Kind == DateTimeKind.Utc ? person.BirthDate : DateTime.SpecifyKind(person.BirthDate.ToUniversalTime(), DateTimeKind.Utc),
                PlaceOfBirth = person.PlaceOfBirth,
                Nationality = person.Nationality,
                CPF = person.CPF,
                CreatedAt = person.CreatedAt.Kind == DateTimeKind.Utc ? person.CreatedAt : DateTime.SpecifyKind(person.CreatedAt.ToUniversalTime(), DateTimeKind.Utc),
                UpdatedAt = person.UpdatedAt.Kind == DateTimeKind.Utc ? person.UpdatedAt : DateTime.SpecifyKind(person.UpdatedAt.ToUniversalTime(), DateTimeKind.Utc)
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

            DateTime now = DateTime.UtcNow;
            Person person = new Person
            {
                Name = dto.Name,
                Gender = dto.Gender,
                Email = dto.Email,
                BirthDate = dto.BirthDate.Kind == DateTimeKind.Utc ? dto.BirthDate : DateTime.SpecifyKind(dto.BirthDate.ToUniversalTime(), DateTimeKind.Utc),
                PlaceOfBirth = dto.PlaceOfBirth,
                Nationality = dto.Nationality,
                CPF = dto.CPF,
                CreatedAt = now.Kind == DateTimeKind.Utc ? now : DateTime.SpecifyKind(now.ToUniversalTime(), DateTimeKind.Utc),
                UpdatedAt = now.Kind == DateTimeKind.Utc ? now : DateTime.SpecifyKind(now.ToUniversalTime(), DateTimeKind.Utc)
            };
            Person created = await _repository.AddAsync(person);
            return new PersonDto
            {
                Id = created.Id,
                Name = created.Name,
                Gender = created.Gender,
                Email = created.Email,
                BirthDate = created.BirthDate.Kind == DateTimeKind.Utc ? created.BirthDate : DateTime.SpecifyKind(created.BirthDate.ToUniversalTime(), DateTimeKind.Utc),
                PlaceOfBirth = created.PlaceOfBirth,
                Nationality = created.Nationality,
                CPF = created.CPF,
                CreatedAt = created.CreatedAt.Kind == DateTimeKind.Utc ? created.CreatedAt : DateTime.SpecifyKind(created.CreatedAt.ToUniversalTime(), DateTimeKind.Utc),
                UpdatedAt = created.UpdatedAt.Kind == DateTimeKind.Utc ? created.UpdatedAt : DateTime.SpecifyKind(created.UpdatedAt.ToUniversalTime(), DateTimeKind.Utc)
            };
        }

        public async Task<bool> UpdateAsync(int id, UpdatePersonDto dto)
        {
            Person? person = await _repository.GetByIdAsync(id);
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
            person.BirthDate = dto.BirthDate.Kind == DateTimeKind.Utc ? dto.BirthDate : DateTime.SpecifyKind(dto.BirthDate.ToUniversalTime(), DateTimeKind.Utc);
            person.PlaceOfBirth = dto.PlaceOfBirth;
            person.Nationality = dto.Nationality;
            person.CPF = dto.CPF;
            var now = DateTime.UtcNow;
            person.UpdatedAt = now.Kind == DateTimeKind.Utc ? now : DateTime.SpecifyKind(now.ToUniversalTime(), DateTimeKind.Utc);
            await _repository.UpdateAsync(person);
            return true;
        }
        private bool IsValidEmail(string email)
        {
            try
            {
                System.Net.Mail.MailAddress addr = new System.Net.Mail.MailAddress(email);
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
            IEnumerable<Person> all = await _repository.GetAllAsync();
            return all.Any(p => p.CPF == cpf && (!ignoreId.HasValue || p.Id != ignoreId.Value));
        }

        public async Task<bool> DeleteAsync(int id)
        {
            Person? person = await _repository.GetByIdAsync(id);
            if (person == null) return false;
            await _repository.DeleteAsync(person);
            return true;
        }
    }
}
