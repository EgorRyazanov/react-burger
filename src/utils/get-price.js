export const getPrice = (parts, bun) => {
    return (
        parts.reduce((acc, current) => acc + current?.price, 0) +
            bun?.price * 2 || 0
    );
};
