import * as React from 'react'
import { Button, Card, Left, CardItem, Body, Text, H2, Icon, Right } from 'native-base'
import moment from 'moment'

type Props = {
  amount: number,
  timestamp: Date,
  addresses: Array<string>,
  asset: string | React.ReactNode,
  children?: any
}

class Transaction extends React.Component<Props, { showDetails: boolean }> {
  toggleDetails = () => this.setState({ showDetails: !this.state.showDetails })
  constructor(props){
    super(props)
    this.state = { showDetails: false }
  }
  render() {
    let { amount, asset, timestamp, addresses, children } = this.props
    let io = (inbound, outbound) => amount > 0 ? inbound : outbound
    let textProps = { styleNames: io('success', 'dark') }
    return (
      <Card>
        <CardItem style={{ display: 'flex', flexDirection: 'row' }}>
          <Left style={{ flex: 2 }}>
            <Icon {...textProps} name={`arrow-circle-o-${io('down', 'up')}`} size={30} color={'black'} />
            <Body>
              <Text {...textProps} style={{ lineHeight: 20, paddingRight: 7 }}>
                {io('+', '-')}
                {Math.abs(amount).toString()} {asset}
              </Text>
            </Body>
          </Left>
          <Right style={{ flex: 1, display: 'flex', flexDirection: 'row', alignItems: 'flex-end' }}>
            <Text styleNames='note' style={{ flex: 4, textAlign: 'right', height: 30, position: 'relative', bottom: 2 }}>
              {moment(timestamp).fromNow()}
            </Text>
            { children ? (
              <Button styleNames='transparent small dark' style={{ flex: 1, position: 'relative', left: 8, bottom: 8 }}
                onPress={this.toggleDetails} >
                <Icon name={this.state.showDetails ? 'minus' : 'plus'} />
              </Button>
            ) : null}
          </Right>
        </CardItem>
        <CardItem
          style={{ paddingTop: 0, maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          {addresses.map((address, i) => (
            <Text key={address} styleNames='bounded note' ellipsizeMode='middle' numberOfLines={1}>
              {io('from', 'to')} {address}
            </Text>
          ))}
        </CardItem>
        { this.state.showDetails ? children : null}
      </Card>
    )
  }
}

export default Transaction
