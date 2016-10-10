import React, { PropTypes } from 'react'
import { View, Text, TouchableHighlight, TextInput, Image, ListView } from 'react-native'
import { myFriendsStyles as styles } from './myFriendsStyles'
import FriendRow, {seperatorFriends} from './FriendRow'

const MyFriends = ({backButtonPressed, friends, renderMyFriendsRow, onSelectFriend, seperatorFriends, setSearchText}) => (
  <View style={styles.container}>
    {/* Header */}
    <View style={styles.header}>
      <TouchableHighlight onPress={backButtonPressed} underlayColor='#F5F5F5'>
        <Image style={styles.backArrow} source={require('../../../images/back_arrow.png')} />
      </TouchableHighlight>
      <Text style={styles.headerTitle}>
        My Friends
      </Text>
      <Text style={styles.backArrow}></Text>
    </View>

    {/*Body*/}
    <View>
       <View style={styles.searchBox}>
           <Image style={styles.searchIcon} source={require('../../../images/search.png')} />
           <TextInput
            style={styles.searchBar}
            onChange={setSearchText}
            placeholder='Search'
           />
       </View>

      <ListView
          enableEmptySections
          dataSource={friends}
          renderRow={function (data, sectionId, rowId, highlightRow) {
              return renderMyFriendsRow(data, sectionId, rowId, highlightRow, onSelectFriend)
          }}
          renderSeparator={seperatorFriends}
      />
    </View>


  </View>
)

const func = PropTypes.func.isRequired

MyFriends.propTypes = {
  friends: PropTypes.object,
  backButtonPressed: func,
  renderMyFriendsRow: func,
  onSelectFriend: func,
  seperatorFriends: func
}

export default MyFriends
