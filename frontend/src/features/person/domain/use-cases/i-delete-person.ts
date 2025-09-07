export interface IDeletePersonUseCase {
  delete(id: number): Promise<void>;
}
