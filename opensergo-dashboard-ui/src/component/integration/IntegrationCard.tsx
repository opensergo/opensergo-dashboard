import React from 'react';
import cx from 'classnames';
import './IntegrationCard.scss';


const BLOCK = 'integration-card';

const IntegrationIcon: React.FC<{ imgUrl: string }> = ({ imgUrl }) => {
    return (
        <img className="integration-icon" src={imgUrl} alt='logo' />
    )
}

const IntegrationCard: React.FC<{ name: string, imgUrl: string, disabled?: boolean }> = ({ name, imgUrl, disabled }) => {

    return (
        <div
            className={cx(`${BLOCK}`, { [`${BLOCK}--disabled`]: disabled })}
            title={disabled ? '正在接入中...' : undefined}
            onClick={() => { }}
        >
            <div>
                <IntegrationIcon imgUrl={imgUrl} />
            </div>
            <div className={`${BLOCK}__name`}>{name}</div>
        </div>
    )
};

export default IntegrationCard;