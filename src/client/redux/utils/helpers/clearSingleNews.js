export default function (singleNew) {
  return singleNew
    .updateIn([ 'singleNews' ], news => {
      return news
        .set('_id', null)
        .set('sourceId', null)
        .set('inMaking', true)
        .set('files', [])
        .set('reposts', [])
        .set('likes', [])
        .set('repostsCount', 0)
        .set('likesCount', 0)
        .set('images', [])
        .set('owner', null)
        .set('text', '')
        .set('datePublished', '')
        .set('isHiddenComment', true)
        .set('title', '')
        .set('description', '')
        .set('hashtag', '')
        .set('project', null)
        .set('showInUserMain', null)
        .updateIn([ 'errors' ], errors => {
          return errors
            .set('attachments', [])
            .set('images', [])
            .set('others', null);
        });
    });
}
