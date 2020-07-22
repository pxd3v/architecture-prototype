export default class IValidator<Dto> {
    public execute: (data: Dto) => Promise<void>;
    public validate: (data: Dto) => Promise<void>;
    public validateFormat: (data: Dto) => Promise<void>;
}