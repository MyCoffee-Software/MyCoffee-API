export default (array: any[], page: number, limit: number): any[] => {
    // Calcular o índice inicial
    const startIndex = (page - 1) * limit;
    // Calcular o índice final
    const endIndex = startIndex + limit;

    // Retornar os itens da página
    return array.slice(startIndex, endIndex);
}