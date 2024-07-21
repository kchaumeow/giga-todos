import {useSearchParams} from "react-router-dom";
import {FiltersParams} from "../components/Filters";

export interface UseFiltersResult {
    filters: FiltersParams;
    setFilters: (filters: Partial<FiltersParams>) => void;
    resetFilters: () => void;
}

export const useFilters = (): UseFiltersResult => {
    const [searchParams, setSearchParams] = useSearchParams();

    const isChecked = searchParams.get('isChecked');
    const sortByDeadline = searchParams.get('sortByDeadline');
    const deadline = searchParams.get('deadline');

    const setFilters = (filters: Partial<FiltersParams>) => {

        const newParams = new URLSearchParams();
        const newFilters = {
            isChecked, sortByDeadline, deadline, ...filters,
        }

        if (newFilters.isChecked) newParams.set('isChecked', newFilters.isChecked);
        if (newFilters.sortByDeadline) newParams.set('sortByDeadline', newFilters.sortByDeadline);
        if (newFilters.deadline) newParams.set('deadline', newFilters.deadline);

        setSearchParams(newParams);
    }

    const resetFilters = () => {
        const newParams = new URLSearchParams();
        setSearchParams(newParams);
    }

    return {
        filters: {isChecked, sortByDeadline, deadline},
        setFilters,
        resetFilters,
    }
}