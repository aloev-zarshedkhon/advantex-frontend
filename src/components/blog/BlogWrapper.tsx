import { Grid } from "@mui/material";
import { ReactElement } from "react";
import BlogItem from "./BlogItem";
import GridWrapper from "../reusable/GridWrapper";
import { AllBlogResult } from "@/types";

type Props = {
  items: AllBlogResult[];
};

const BlogWrapper = ({ items }: Props): ReactElement => {
  return (
    <Grid container>
      {items.map((e, index) => (
        <GridWrapper key={index}>
          <BlogItem
            main_image={e.main_image}
            title={e.title}
            slug={e.slug}
            created_at={e.created_at}
            categories={e.categories}
          />
        </GridWrapper>
      ))}
    </Grid>
  );
};

export default BlogWrapper;
