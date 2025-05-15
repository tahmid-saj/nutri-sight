import styled from "styled-components";

export const UploadImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2% 0% 2% 0%;
`;

export const UploadImageForm = styled.form`
  padding: 2%;
`;

interface UploadedImageContainerProps {
  visible?: string;
}

export const UploadedImageContainer = styled.div<UploadedImageContainerProps>`
  display: ${(props) => (props.visible === "hidden" ? "none" : "flex")};
  justify-content: center;
  align-items: center;
  margin: 2% 2% 2% 2%;
  visibility: ${(props) => props.visible};
`;

export const UploadedImage = styled.img`
  box-shadow: 5px 5px 5px 5px rgb(150, 150, 150);
  border-radius: 1.5rem;
  padding: 2%;
`;
