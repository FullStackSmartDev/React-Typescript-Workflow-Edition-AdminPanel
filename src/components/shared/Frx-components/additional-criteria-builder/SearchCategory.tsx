import React from "react";
import { List, ListItem, ListItemText, Box } from "@material-ui/core";
import { ReactComponent as ArrowsIcon } from "./assets/arrows.svg";

interface CategoryData {
  id: number;
  category: string;
}

export default class SearchCategory extends React.Component<any, any> {
  render() {
    return (
      <List>
        {this.props.categoriesData.map((item: CategoryData, i: number) => {
          return (
            <ListItem
              key={item.id}
              className='member-notes-popup-root__category-list__item'
              onClick={(e) =>
                this.props.handleListItemClick(
                  item,
                  this.props.additionalCriteriaId
                )
              }
            >
              <Box component='span' display='block'>
                <ArrowsIcon />
              </Box>
              <ListItemText
                key={item.id}
                className='member-notes-popup-root__category-list__item__text'
              >
                {item.category}
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    );
  }
}
