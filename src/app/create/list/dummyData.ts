import { CardProps } from '../../../components/Card'

export type CreatedCardProps = {
  title: string
  creatorName: string
  userImages: CardProps['userImages']
  layout: CardProps['layout']
  creator: { id: string }
}

export type CreatedCardsProps = {
  createdCard: CreatedCardProps[]
}
export const dummyData: CreatedCardsProps = {
  createdCard: [
    {
      title: 'Sample CardCardCardCard',
      creatorName: 'John Doe',
      userImages: [
        {
          id: 1,
          attributes: {
            formats: {
              thumbnail: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
              small: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
              medium: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
              large: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
            },
            url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
          },
        },
      ],
      layout: [
        {
          container: {
            x: 10,
            y: 20,
            scale: 1.5,
            rotate: 0,
          },
          content: {
            type: 'text',
            text: 'Hello World',
            color: '#000000',
            align: 'center',
          },
        },
        {
          container: {
            x: 50,
            y: 30,
            scale: 1.2,
            rotate: 45,
          },
          content: {
            type: 'userImage',
            id: 1,
          },
        },
        {
          container: {
            x: 100,
            y: 40,
            scale: 0.8,
            rotate: 90,
          },
          content: {
            type: 'sticker',
            stickerId: 123,
          },
        },
      ],
      creator: {
        id: 'user123',
      },
    },
    {
      title: 'Sample Card 2',
      creatorName: 'Jane Smith',
      userImages: [
        {
          id: 2,
          attributes: {
            formats: {
              thumbnail: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
            },
            url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
          },
        },
      ],
      layout: [
        {
          container: {
            x: 15,
            y: 25,
            scale: 1.1,
            rotate: 10,
          },
          content: {
            type: 'text',
            text: 'Sample Text',
            color: '#FF5733',
            align: 'left',
          },
        },
      ],
      creator: {
        id: 'user456',
      },
    },
    {
      title: 'Sample Card 3',
      creatorName: 'Alice Johnson',
      userImages: [
        {
          id: 3,
          attributes: {
            formats: {
              small: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
              medium: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
            },
            url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
          },
        },
      ],
      layout: [
        {
          container: {
            x: 5,
            y: 15,
            scale: 1,
            rotate: 0,
          },
          content: {
            type: 'sticker',
            stickerId: 101,
          },
        },
        {
          container: {
            x: 70,
            y: 50,
            scale: 1.3,
            rotate: -10,
          },
          content: {
            type: 'userImage',
            id: 3,
          },
        },
      ],
      creator: {
        id: 'user789',
      },
    },
    {
      title: 'Sample Card 4',
      creatorName: 'Bob Brown',
      userImages: [
        {
          id: 4,
          attributes: {
            formats: {
              medium: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
              large: {
                url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
              },
            },
            url: 'https://interactive-examples.mdn.mozilla.net/media/examples/firefox-logo.svg',
          },
        },
      ],
      layout: [
        {
          container: {
            x: 25,
            y: 35,
            scale: 0.9,
            rotate: 15,
          },
          content: {
            type: 'text',
            text: 'Creative Design',
            color: '#00AEEF',
            align: 'right',
          },
        },
        {
          container: {
            x: 40,
            y: 60,
            scale: 1.1,
            rotate: -20,
          },
          content: {
            type: 'userImage',
            id: 4,
          },
        },
      ],
      creator: {
        id: 'user101',
      },
    },
  ],
}
