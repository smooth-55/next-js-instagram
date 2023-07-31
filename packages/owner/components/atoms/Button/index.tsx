import styled, { css } from "styled-components";

const StyledButton = styled.button.attrs((props: { transparent: boolean, block: boolean }) => props)`
  background: ${props => props.transparent ? "none" : "#0095f6"}; 
  border: ${props => props.transparent ? "1px solid #ddd" : "none"}; ;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: ${props => props.transparent ? "black" : "#fff"};
  padding: 0 9px;
  border-radius: 4px;
  cursor: pointer;
  max-width: max-content;
  display: ${props => props.block ? "block" : "inline"};

  :disabled {
    background-color: rgba(0, 149, 246, 0.3);
    pointer-events: none;
  }
`;



const Button = ({
    background = true,
    disabled = false,
    block = false,
    loading = false,
    children,
    ...props
}) => {
    return (
        <StyledButton
            block={block}
            transparent={!background}
            disabled={disabled}
            {...props}
        >
            {loading ? (
                <svg height="26px" style={{ marginTop: "2px" }} viewBox="0 0 50 50">
                    <path
                        fill="#000"
                        d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
                    >
                        <animateTransform
                            attributeType="xml"
                            attributeName="transform"
                            type="rotate"
                            from="0 25 25"
                            to="360 25 25"
                            dur="0.6s"
                            repeatCount="indefinite"
                        />
                    </path>
                </svg>
            ) : (
                children
            )}
        </StyledButton>
    );
};



export { Button };
