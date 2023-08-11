import { styled } from "styled-components";
import { DashboardBlock } from "../DashboardBlock";


export const FilterContainer = styled(DashboardBlock)`
    &.filter-modal {
        margin-top: 0;
    }
`;

export const FilterWrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 767px) {
        flex-direction: column;
        align-items: end;
        justify-content: center;
    }
`;

export const FilterCategory = styled.div`
    gap: 0.625rem;
`;

export const FilterType = styled.div`
    gap: 0.625rem;
`;

export const FilterDate = styled.div`
    gap: 0.625rem;
`;

export const FilterButton = styled.div`
    button {
        padding: 0.9375rem;
        border: none;
        box-shadow: none;
        background-color: var(--red);
        color: var(--white);
    }
`;