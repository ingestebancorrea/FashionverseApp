import { useMemo, useState } from 'react';

interface Props {
    data: any[];
}

export const useDataFilter = ({ data }: Props) => {
    const [page, setPage] = useState<number>(1);
    const pageSize = 5;

    const paginatedData = useMemo(() => {
        if ( data.length > 0 ) {
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            return data.slice(startIndex, endIndex);
        }
    }, [data, page]);

    return {
        paginatedData,
        page,
        setPage,
    };
};
