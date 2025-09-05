using Microsoft.AspNetCore.Mvc;
using PersonManage.Models;
using PersonManage.Services;

namespace PersonManage.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PersonController : ControllerBase
    {
        private readonly IPersonService _personService;

        public PersonController(IPersonService personService)
        {
            _personService = personService;
        }


		/// <summary>
		/// Obtém todas as pessoas cadastradas.
		/// </summary>
		/// <returns>Lista de pessoas.</returns>
		[HttpGet]
		public async Task<ActionResult<IEnumerable<PersonDto>>> GetAll()
		{
			IEnumerable<PersonDto> people = await _personService.GetAllAsync();
			return Ok(people);
		}

		/// <summary>
		/// Obtém uma pessoa pelo ID.
		/// </summary>
		/// <param name="id">ID da pessoa.</param>
		/// <returns>Dados da pessoa encontrada.</returns>
		[HttpGet("{id}")]
		public async Task<ActionResult<PersonDto>> GetById(int id)
		{
			PersonDto? person = await _personService.GetByIdAsync(id);
			if (person == null)
				return NotFound();
			return Ok(person);
		}

		/// <summary>
		/// Cria uma nova pessoa.
		/// </summary>
		/// <param name="dto">Dados para criação da pessoa.</param>
		/// <returns>Pessoa criada.</returns>
		[HttpPost]
		public async Task<ActionResult<PersonDto>> Create(CreatePersonDto dto)
		{
			PersonDto created = await _personService.AddAsync(dto);
			return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
		}

		/// <summary>
		/// Atualiza uma pessoa existente.
		/// </summary>
		/// <param name="id">ID da pessoa.</param>
		/// <param name="dto">Dados para atualização.</param>
		/// <returns>Sem conteúdo se atualizado com sucesso.</returns>
		[HttpPut("{id}")]
		public async Task<IActionResult> Update(int id, UpdatePersonDto dto)
		{
			bool updated = await _personService.UpdateAsync(id, dto);
			if (!updated)
				return NotFound();
			return NoContent();
		}

		/// <summary>
		/// Remove uma pessoa pelo ID.
		/// </summary>
		/// <param name="id">ID da pessoa.</param>
		/// <returns>Sem conteúdo se removido com sucesso.</returns>
		[HttpDelete("{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			bool deleted = await _personService.DeleteAsync(id);
			if (!deleted)
				return NotFound();
			return NoContent();
		}
    }
}
