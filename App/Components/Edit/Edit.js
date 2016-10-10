import React, { PropTypes } from 'react'
import { Text, View, TouchableHighlight, Image } from 'react-native'
import { editStyles as styles } from './editStyles'

const Edit = ({
  backPressed,
  onSendPressed,
  uri
  }) => (
  // Render the image here.
  <Image source={{uri: uri}} style={styles.container}>

    {/* Top Navigation */}
    <View style={styles.header}>
      {/* Back button */}
      <View style={styles.flex}>
        <TouchableHighlight onPress={backPressed}>
          <Text style={styles.headerButton}> / B / </Text>
        </TouchableHighlight>
      </View>
      <View style={styles.flex} />

      {/* Editing buttons */}
      <View style={styles.triple}>
        {/* Add sticker */}
        <TouchableHighlight>
          <Text style={styles.headerButton} > / S / </Text>
        </TouchableHighlight>

        {/* Add text */}
        <TouchableHighlight>
          <Text style={styles.headerButton} > / T / </Text>
        </TouchableHighlight>

        {/* Draw */}
        <TouchableHighlight>
          <Text style={styles.headerButton} > / D / </Text>
        </TouchableHighlight>
      </View>
    </View>

    {/* Bottom navigation */}
    <View style={styles.footer}>
      <View style={styles.header}>
        {/* Editing buttons */}
        <View style={styles.triple}>
          {/* Change time */}
          <TouchableHighlight>
            <Text style={styles.headerButton} > / T / </Text>
          </TouchableHighlight>

          {/* Save snap */}
          <TouchableHighlight>
            <Text style={styles.headerButton} > / S / </Text>
          </TouchableHighlight>

          {/* Add to story */}
          <TouchableHighlight>
            <Text style={styles.headerButton} > / S / </Text>
          </TouchableHighlight>
        </View>

        {/* Send */}
        <View style={styles.flex} />
          <TouchableHighlight onPress={onSendPressed}>
            <Text style={styles.headerButton} > / S / </Text>
          </TouchableHighlight>
        </View>
    </View>
  </Image>
)

Edit.propTypes = {
  backPressed: PropTypes.func.isRequired,
  onSendPressed: PropTypes.func.isRequired,
  uri: PropTypes.string.isRequired
}

export default Edit
