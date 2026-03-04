import React from "react";
import {
  SearchWrapper,
  InputWrapper,
  SearchInput,
  ClearButton,
  ResultsBadge,
} from "./styles.js";

interface Props {
  value: string;
  onChange: (value: string) => void;
  resultCount?: number;
}

export const SearchBar: React.FC<Props> = ({ value, onChange, resultCount }) => (
  <SearchWrapper>
    <InputWrapper>
      <SearchInput
        type="text"
        placeholder="Filter tasks..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <ClearButton onClick={() => onChange("")} title="Clear search">
          &times;
        </ClearButton>
      )}
    </InputWrapper>
    {value && resultCount !== undefined && (
      <ResultsBadge>
        {resultCount} {resultCount === 1 ? "match" : "matches"}
      </ResultsBadge>
    )}
  </SearchWrapper>
);
