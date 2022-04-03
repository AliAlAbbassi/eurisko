import React from "react";
import {
  Box,
  Heading,
  Link,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
} from "@chakra-ui/react";
import { Doc } from "../types";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag
            textOverflow={"ellipsis"}
            size={"md"}
            variant="solid"
            colorScheme="orange"
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${props.name}`}
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};

interface ArticleListProps {
  docs: Doc[];
}

const ArticleList = ({ docs }: ArticleListProps) => {
  return (
    <>
      {docs.map(
        ({
          id,
          source,
          section_name,
          multimedia,
          keywords,
          headline,
          snippet,
          byline,
          web_url,
        }) => {
          let tags = [];
          if (keywords.length > 0)
            for (let i = 0; i < 3; i++) tags.push(keywords[i].value);

          return (
            <Container maxW={"7xl"} p="12" key={id}>
              <Heading as="h1">{source}</Heading>
              <Heading as="h2" marginTop="5">
                {section_name}
              </Heading>
              <Divider marginTop="5" />
              <Wrap spacing="30px" marginTop="5">
                <WrapItem
                  width={{ base: "100%", sm: "45%", md: "45%", lg: "30%" }}
                >
                  <Box w="100%">
                    <Box borderRadius="lg" overflow="hidden">
                      <Link
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                      >
                        {multimedia && multimedia[0] ? (
                          <Image
                            transform="scale(1.0)"
                            src={
                              "https://static01.nyt.com/" + multimedia[0].url
                            }
                            alt="some text"
                            objectFit="contain"
                            width="100%"
                            transition="0.3s ease-in-out"
                            _hover={{
                              transform: "scale(1.05)",
                            }}
                          />
                        ) : null}
                      </Link>
                    </Box>
                    <BlogTags tags={tags} marginTop="3" />
                    <Heading fontSize="xl" marginTop="2">
                      <Link
                        textDecoration="none"
                        _hover={{ textDecoration: "none" }}
                        href={web_url}
                      >
                        {headline.kicker}
                      </Link>
                    </Heading>
                    <Text as="p" fontSize="md" marginTop="2">
                      {snippet}
                    </Text>
                    <BlogAuthor
                      name={byline.original}
                      date={new Date("2021-04-06T19:01:27Z")}
                    />
                  </Box>
                </WrapItem>
              </Wrap>
            </Container>
          );
        }
      )}
    </>
  );
};

export default ArticleList;
