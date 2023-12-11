import { Autocomplete, InputBase } from "@mui/material"
import { styled, alpha } from "@mui/material/styles"
import { Search as SearchIcon } from "@mui/icons-material"

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: 16,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
  },
}))

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  color: "inherit",
  width: "100%",
}))

function SearchBar() {
  const searchTerms: any[] = []
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledAutocomplete
        disablePortal
        id='combo-box-demo'
        options={searchTerms}
        forcePopupIcon={false}
        renderInput={(params) => {
          const { InputLabelProps, InputProps, ...rest } = params
          return (
            <StyledInputBase
              {...params.InputProps}
              {...rest}
              placeholder='Search…'
            />
          )
        }}
      />
    </Search>
  )
}

export default SearchBar
