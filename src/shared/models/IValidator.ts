export default interface IValidator<Dto> {
    execute: (data: Dto) => Promise<void>;
    validate: (data: Dto) => Promise<void>;
    validateFormat: (data: Dto) => Promise<void>;
}