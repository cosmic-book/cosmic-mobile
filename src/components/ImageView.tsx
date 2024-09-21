import { Image, Text } from "react-native"

type ImageViewProps = {
  image: any
  label: string,
  width: number,
  height: number,
}

export const ImageView = ({ image, label, width, height }: ImageViewProps) => {
  return (
    <>
      <Image
        source={image}
        style={{ width, height, marginBottom: 16 }}
      />
      <Text className="text-center text-lg font-medium mt-2 color-gray-400">
        {label}
      </Text>
    </>
  )
}