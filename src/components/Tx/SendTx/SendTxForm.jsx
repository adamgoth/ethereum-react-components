import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import TxDescription from './TxDescription'
import FeeSelector from './FeeSelector'
import SubmitTxForm from './SubmitTxForm'
import GasNotification from './GasNotification'
import TxParties from './TxParties'

export default class SendTx extends Component {
  static displayName = 'SendTx'

  static propTypes = {
    etherPriceUSD: PropTypes.string,
    network: PropTypes.string,
    newTx: PropTypes.object
  }

  state = {
    hasSignature: false,
    providedGas: 0,
    fromIsContract: false,
    priority: false
  }

  togglePriority = () => {
    const { priority } = this.state
    this.setState({ priority: !priority })
  }

  handleSubmit = formData => {
    const { priority } = this.state
    const { newTx } = this.props
    const { data, to, from, gas, gasPrice, estimatedGas, value } = newTx

    // If no gas value was provided, use estimatedGas
    const gasValue =
      parseInt(gas, 16) !== 0 ? gas : `0x${estimatedGas.toString(16)}`

    // If priority tx, double the value and format it
    const chosenPrice = priority ? `0x${(gasPrice * 2).toString(16)}` : gasPrice

    const txData = {
      data,
      from,
      gas: gasValue,
      gasPrice: chosenPrice,
      pw: formData.pw,
      value
    }

    if (to) {
      txData.to = to
    }

    // FIXME this.props.dispatch(confirmTx(txData))
    console.log('txData', txData)
  }

  render() {
    const { newTx, network, etherPriceUSD } = this.props
    const {
      from,
      to,
      value,
      gasPrice,
      estimatedGas,
      gasError,
      gasLoading,
      unlocking,
      data,
      isNewContract,
      toIsContract,
      executionFunction,
      params,
      token
    } = newTx

    const {
      fromIsContract,
      hasSignature,
      showFormattedParams,
      providedGas,
      priority
    } = this.state

    return (
      <div>
        <TxDescription
          adjustWindowHeight={this.adjustWindowHeight}
          data={data}
          estimatedGas={estimatedGas}
          executionFunction={executionFunction}
          gasLoading={gasLoading}
          gasPrice={gasPrice}
          gasError={gasError}
          isNewContract={isNewContract}
          network={network}
          params={params}
          etherPriceUSD={etherPriceUSD}
          providedGas={providedGas}
          showFormattedParams={showFormattedParams}
          to={to}
          toIsContract={toIsContract}
          value={value}
          token={token}
        />

        <TxParties
          fromIsContract={fromIsContract}
          from={from}
          isNewContract={isNewContract}
          to={to}
          toIsContract={toIsContract}
          executionFunction={executionFunction}
          params={params}
          hasSignature={hasSignature}
          value={value}
        />

        <StyledSpacer>
          <FeeSelector
            gasLoading={gasLoading}
            gasPrice={gasPrice}
            estimatedGas={estimatedGas}
            etherPriceUSD={etherPriceUSD}
            network={network}
            togglePriority={this.togglePriority}
            priority={priority}
          />
        </StyledSpacer>

        <GasNotification
          estimatedGas={estimatedGas}
          gasLoading={gasLoading}
          toIsContract={toIsContract}
          to={to}
        />

        {!gasLoading && estimatedGas !== undefined && (
          <SubmitTxForm
            unlocking={unlocking}
            handleSubmit={this.handleSubmit}
          />
        )}
      </div>
    )
  }
}

const StyledSpacer = styled.div`
  margin: 20px 0;
`
