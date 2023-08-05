import styled from "styled-components"


const StyledLoader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70vh;
    margin: 0;
    background-color: #f8f8f8;

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
}

.loading-spinner {
    width: 50px;
    height: 50px;
    border: 5px solid #ccc;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
`
export const Loader = () => {
    return (
        <StyledLoader>
            <div className="loading-container">
                <div className="loading-spinner"></div>
            </div>
        </StyledLoader>
    )
}
