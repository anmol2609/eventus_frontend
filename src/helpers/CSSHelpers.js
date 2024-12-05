import { Colors } from '../utils/colors'

export const ratingStyles = (rating) => ({
  backgroundColor: rating >= 5 ? Colors.RATINGS.GREEN : Colors.RATINGS.YELLOW,
  textAlign: 'center',
  paddingRight: 10,
  paddingLeft: 10,
  borderRadius: 100,
  width: 44,
})
