import { Card, Flex } from '@sanity/ui';
import AuthorAvatar from '../../components/BlogPost/AuthorAvatar';
import type { Author } from 'lib/sanity.queries';

export default function AuthorAvatarPreviewPane(props: Author) {
  const { name, image } = props;
  return (
    <Card padding={6}>
      <Flex justify="center">
        <AuthorAvatar name={name || 'Untitled'} image={image} />
      </Flex>
    </Card>
  );
}
