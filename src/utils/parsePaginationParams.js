const parseNumber = (number, defaltValue) => {
    const isString = typeof number === 'string';
    if (!isString) return defaltValue;
    const parsedNumber = parseInt(number);
    if (Number.isNaN(parsedNumber)) {
      return defaltValue;
    }
    return parsedNumber;
  };

  export const parsePaginationParams = (query) => {
    const { page, perPage } = query;
    const parsedPage = parseNumber(page, 1);
    const parsedPerPage = parseNumber(perPage, 10);
    return {
      page: parsedPage,
      perPage: parsedPerPage,
    };
  };
