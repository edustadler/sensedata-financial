import { styled } from "styled-components";

export const HeaderApp = styled.div`
    margin: 0;

    .dashboard-block.header .container {
        border: none;
        box-shadow: none;
    }
`;

export const HeaderButtons = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;

    button {
        border: none;
        box-shadow: none;
        padding: 0.625rem;
    }
`;

export const FilterButton = styled.button`
    background-color: var(--red);

    svg path {
        fill: var(--white);
    }
`;

export const AddButton = styled.button`
    background-color: var(--blue);
    color: var(--white);
`;