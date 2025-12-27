export const formatDate = (date: string) => {
    return new Date(date)
        .toLocaleDateString("en-US",
            {
                year: "2-digit",
                month: "2-digit",
                day: "2-digit"})
        .replace(/,/g, "");
}