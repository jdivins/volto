/**
 * Edit map tile.
 * @module components/manage/Tiles/Maps/Edit
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { readAsDataURL } from 'promise-file-reader';
import {
  Button,
  Dimmer,
  Image,
  Container,
  Input,
  Loader,
  Message,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { settings } from '~/config';

import { Icon } from '../../../../components';
import trashSVG from '../../../../icons/delete.svg';
import clearSVG from '../../../../icons/clear.svg';
import folderSVG from '../../../../icons/folder.svg';
import imageSVG from '../../../../icons/image.svg';
import imageLeftSVG from '../../../../icons/image-left.svg';
import imageRightSVG from '../../../../icons/image-right.svg';
import imageFitSVG from '../../../../icons/image-fit.svg';
import imageFullSVG from '../../../../icons/image-full.svg';

import { createContent } from '../../../../actions';
import { getBaseUrl } from '../../../../helpers';

const messages = defineMessages({
  ImageTileInputPlaceholder: {
    id: 'Enter Map URL',
    defaultMessage: 'Enter Map URL',
  },
});

@injectIntl
@connect(
  state => ({
    request: state.content.create,
    content: state.content.data,
  }),
  dispatch => bindActionCreators({ createContent }, dispatch),
)
/**
 * Edit image tile class.
 * @class Edit
 * @extends Component
 */
export default class Edit extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    selected: PropTypes.bool.isRequired,
    tile: PropTypes.string.isRequired,
    data: PropTypes.objectOf(PropTypes.any).isRequired,
    content: PropTypes.objectOf(PropTypes.any).isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    onChangeTile: PropTypes.func.isRequired,
    onSelectTile: PropTypes.func.isRequired,
    onDeleteTile: PropTypes.func.isRequired,
    createContent: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);

    this.state = {
      uploading: false,
      url: '',
    };
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.request.loading &&
      nextProps.request.loaded &&
      this.state.uploading
    ) {
      this.setState({
        uploading: false,
      });
      this.props.onChangeTile(this.props.tile, {
        ...this.props.data,
        url: nextProps.content['@id'],
      });
    }
  }


  /**
   * Align tile handler
   * @method onAlignTile
   * @param {string} align Alignment option
   * @returns {undefined}
   */
  onAlignTile(align) {
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      align,
    });
  }

  /**
   * Change url handler
   * @method onChangeUrl
   * @param {Object} target Target object
   * @returns {undefined}
   */
  onChangeUrl = ({ target }) => {
    this.setState({
      url: target.value,
    });
  };

  /**
   * Submit url handler
   * @method onSubmitUrl
   * @returns {undefined}
   */
  onSubmitUrl = e => {
    e.preventDefault();
    this.props.onChangeTile(this.props.tile, {
      ...this.props.data,
      url: this.state.url,
    });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div
        onClick={() => this.props.onSelectTile(this.props.tile)}
        className={[
          'tile',
          'image',
          'align',
          this.props.selected && 'selected',
          this.props.data.align,
        ]
          .filter(e => !!e)
          .join(' ')}
      >
        {this.props.selected &&
          !!this.props.data.url && (
            <div className="toolbar">
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'left')}
                  active={this.props.data.align === 'left'}
                >
                  <Icon name={imageLeftSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'right')}
                  active={this.props.data.align === 'right'}
                >
                  <Icon name={imageRightSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'center')}
                  active={
                    this.props.data.align === 'center' || !this.props.data.align
                  }
                >
                  <Icon name={imageFitSVG} size="24px" />
                </Button>
              </Button.Group>
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={this.onAlignTile.bind(this, 'full')}
                  active={this.props.data.align === 'full'}
                >
                  <Icon name={imageFullSVG} size="24px" />
                </Button>
              </Button.Group>
              <div className="separator" />
              <Button.Group>
                <Button
                  icon
                  basic
                  onClick={() =>
                    this.props.onChangeTile(this.props.tile, {
                      ...this.props.data,
                      url: '',
                    })
                  }
                >
                  <Icon name={clearSVG} size="24px" color="#e40166" />
                </Button>
              </Button.Group>
            </div>
          )}
        {this.props.selected &&
          !this.props.data.url && (
            <div className="toolbar">
              <Icon name={imageSVG} size="24px" />
              <form onSubmit={e => this.onSubmitUrl(e)}>
                <Input
                  onChange={this.onChangeUrl}
                  placeholder={this.props.intl.formatMessage(
                    messages.ImageTileInputPlaceholder,
                  )}
                />
              </form>
            </div>
          )}
        {this.props.data.url ? (
            <div>
            <iframe src={this.props.data.url} width="600" height="450" frameborder="0" style={{border:0, zIndex: 1, position: 'relative' }} allowfullscreen></iframe>
              </div>
        ) : (
          <div>
            <Message>
              {this.state.uploading &&
              <center>
                Enter url
              </center>}
            </Message>
          </div>
        )}
        {this.props.selected && (
          <Button
            icon
            basic
            onClick={() => this.props.onDeleteTile(this.props.tile)}
            className="tile-delete-button"
          >
            <Icon name={trashSVG} size="18px" />
          </Button>
        )}
      </div>
    );
  }
}
