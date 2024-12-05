/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { Colors } from '../utils/colors'
export const SubHeaders = ({
  title,
  index,
  selectedView,
  setSelectedView,
  selectedSaasIndex,
  setSelectedSaasIndex,
  selectedSaasView,
  setSelectedSaasView,
  setCurrentPage = () => {},
}) => (
  <div>
    <div
      onClick={() => {
        setCurrentPage(1)
        setSelectedView(index)

        if (selectedSaasView != undefined) setSelectedSaasView(selectedSaasView)
        if (selectedSaasIndex != undefined) setSelectedSaasIndex(selectedSaasIndex)
      }}
      className="mx-3 rss-feed-view"
      style={{
        textAlign: 'center',
        color: index === selectedView ? Colors.WHITE : Colors.GRAY,
        paddingBottom: 10,
      }}
    >
      {title}
    </div>
    <div
      style={
        index === selectedView
          ? {
              height: '4px',
              width: '104',
              padding: '2px, 0px, 4px, 0px',
              backgroundColor: Colors.BLUE,
              borderTopRightRadius: '22px',
              borderTopLeftRadius: '22px',
            }
          : {}
      }
    ></div>
  </div>
)
