interface Props {
  params: {
    id: string
  }
}

export default function Chat({ params }: Props) {
  return <h2>Chat ID: {params.id}</h2>
}
