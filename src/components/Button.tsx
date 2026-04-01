import styled from "styled-components";

type ButtonProps = {
  text: string;
  onClick?: () => void;
  className?: string;
};

const ViewMoreButton = ({ text, onClick, className }: ButtonProps) => {
  return (
    <StyledWrapper className={className}>
      <button className="button" data-text={text} onClick={onClick}>
        <span className="actual-text">&nbsp;{text}&nbsp;</span>
        <span aria-hidden="true" className="hover-text">
          &nbsp;{text}&nbsp;
        </span>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .button {
    margin: 0;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;
    display: inline-block;
  width: fit-content;

    /* 🔥 customize here */
    --border-right: 4px;
    --text-stroke-color: rgba(255, 255, 255, 0.5);
    --animation-color: #3b82f6; /* blue (your theme) */
    --fs-size: 1.0rem;

    letter-spacing: 2px;
    font-size: var(--fs-size);
    font-family: "Space Grotesk", sans-serif; /* 👈 matches your UI */
    position: relative;
    text-transform: uppercase;

    color: transparent;
    -webkit-text-stroke: 1px var(--text-stroke-color);
  }

  .actual-text,
.hover-text {
  display: inline-block;
  white-space: nowrap;
}

  .hover-text {
  position: absolute;
  inset: 0;
  width: 0%;
  overflow: hidden;

  color: var(--animation-color);
  border-right: var(--border-right) solid var(--animation-color);

  transition: width 0.5s ease;
  -webkit-text-stroke: 1px var(--animation-color);

  
}

  .button:hover .hover-text {
    width: 100%;
    filter: drop-shadow(0 0 12px var(--animation-color));
  }

  
`;

export default ViewMoreButton;