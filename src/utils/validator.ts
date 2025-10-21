export function validatorForm(data: Record<string,any>): boolean {
    for (const key in data){
        if (data[key] === '' || data[key] == null){
            return false;
        }
    }
    return true;
}