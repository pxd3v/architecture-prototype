export default interface IFormatValidationProvider {
    validate: (data: any, schema: any) => any
}