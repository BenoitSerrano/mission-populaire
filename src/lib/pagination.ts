function extractPaginationParams<queryT extends { page?: string; perPage?: string }>(
    query: queryT,
) {
    let limit = 10;
    let offset = 0;
    if (query.perPage) {
        const parsedLimit = parseInt(query.perPage);
        if (parsedLimit > 0 && parsedLimit <= 100) {
            limit = parsedLimit;
        }
    }
    if (query.page) {
        const page = parseInt(query.page);
        if (page >= 0) {
            offset = page * limit;
        }
    }
    return { limit, offset };
}

export { extractPaginationParams };
