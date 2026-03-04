import styled from "styled-components";

export const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const SearchInput = styled.input`
  width: 220px;
  padding: 8px 32px 8px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.85rem;
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}22;
    width: 280px;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const ClearButton = styled.button`
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surfaceHover};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 0.7rem;
  padding: 0;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.surfaceActive};
    color: ${({ theme }) => theme.colors.text};
  }
`;

export const ResultsBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  white-space: nowrap;
  padding: 4px 10px;
  background: ${({ theme }) => theme.colors.primary}11;
  border-radius: ${({ theme }) => theme.radii.md};
`;
