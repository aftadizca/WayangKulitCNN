import React from 'react'
import { Button, Text } from 'native-base'
import { styles } from '../config'

function MyButton(props) {
    return (
        <Button {...props} style={styles.buttonPrimary} rounded>
            <Text style={styles.buttonPrimaryText}>{props.children}</Text>
        </Button>
    )
}

export default MyButton