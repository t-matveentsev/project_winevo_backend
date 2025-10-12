export const parseWineFilterParams = async ({
  type,
  varietal,
  title,
  country,
  winery,
  query,
}) => {
  return {
    type: type || undefined,
    varietal: varietal || undefined,
    title: title || undefined,
    country: country || undefined,
    winery: winery || undefined,
    query: query || undefined,
  };
};
