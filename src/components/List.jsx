import React, { useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import SearchIcon from "@mui/icons-material/Search";
import InfiniteScroll from "react-infinite-scroll-component";
import Link from "@mui/material/Link";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@mui/material";
import Grid from '@mui/material/Grid';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Lists() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [skip,setSkip]=useState(0)
  const [limit,setLimit]=useState(10)
  const [search, setSearch] = useState("");
  const [totalDoc, setTotalDoc] = useState(0);
  useEffect(() => {
    const fetchdata = async () => {
      axios
        .get("http://54.212.17.247:3001/get_bookmarks", {
          params: { skip: skip, limit: limit, search: search },
        })
        .then((res) => {
          if (res.data.code === 200) {
            setData(res.data.data);
            setTotalDoc(res.data.total_documents);
          }
        });
    };
    fetchdata()
  }, [skip,limit]);

 
  const fetchMoreData = () => {
    console.log(skip + 1, "jjjjjjjj");
    var updatedSkip = skip + 1;
    axios
      .get("http://54.212.17.247:3001/get_bookmarks", {
        params: { skip: updatedSkip, limit: limit, search: search },
      })
      .then((res) => {
        var newArray = data.concat(res.data.data);
        setData(newArray);
        setTotalDoc(res.data.total_documents);
      });
  };
  const searchfunction = (e) => {
    var newKey = e.target.value;
    setSearch(newKey);
    axios
      .get("http://54.212.17.247:3001/get_bookmarks", {
        params: { skip: skip, limit: limit, search: newKey },
      })
      .then((res) => {
        if (res.data.code === 200) {
          setData(res.data.data);
          setTotalDoc(res.data.total_documents);
        }
      });
  };
  const redirect = () => {
    navigate("/create_bookmark");
  };
  return (
    <>
    <Grid container spacing={0}>
    <Box sx={{ width: "100%", bgcolor: "background.paper" ,flexGrow:1}}>
      {/* <Grid container spacing={2}>
        
      </Grid> */}
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
            >
              RIAFY BOOK MARKS
            </Typography>
            <Tooltip title="Create new bookmark">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <AddIcon onClick={redirect} />
            </IconButton>
            </Tooltip>
      
            <Search onChange={(e) => searchfunction(e)}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Toolbar>
        </AppBar>
        <InfiniteScroll
          dataLength={data.length}
          next={fetchMoreData}
          hasMore={data.length !== totalDoc}
          loader={
            <>
              <h6>Loading</h6>
            </>
          }
        >
          <nav aria-label="main mailbox folders">
            {data.map((bookmark) => (
              <List>
                <ListItem disablePadding>
                  <ListItemText
                    primary={bookmark.title}
                    secondary={
                      <React.Fragment>
                        <Link href={bookmark.url}>{bookmark.url}</Link>
                        <Typography>{bookmark.createdAt}</Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            ))}
          </nav>
          <Divider />
        </InfiniteScroll>
      </Box>
        </Grid>
    
    </>
  );
}

export default Lists;
