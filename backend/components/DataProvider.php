<?php


namespace app\components;

use Yii;
use yii\base\InvalidArgumentException;
use yii\base\InvalidConfigException;
use yii\db\QueryInterface;

/**
 * Class DataProvider
 * @package app\components
 *
 * @property SeekPagination $pagination
 */
class DataProvider extends \yii\data\ActiveDataProvider
{
    private $_pagination;

    protected function prepareModels()
    {
        if (!$this->query instanceof QueryInterface) {
            throw new InvalidConfigException('The "query" property must be an instance of a class that implements the QueryInterface e.g. yii\db\Query or its subclasses.');
        }

        $query = clone $this->query;

        if (($sort = $this->getSort()) !== false) {
            $query->addOrderBy($sort->getOrders());
        }

        if (($pagination = $this->getPagination()) !== false) {
            if ($pagination instanceof SeekPagination) {
                $pagination->applySeekCondition($query);
                $query->limit($pagination->getLimit());
            } else {
                //TODO: реализовать возможность использования обычной пагинации (запрос с указанием страницы и т.п.)
                $pagination->totalCount = $this->getTotalCount();
                if ($pagination->totalCount === 0) {
                    return [];
                }
                $query->limit($pagination->getLimit())->offset($pagination->getOffset());
            }
        }

        return $query->all($this->db);
    }

    /**
     * @return false|SeekPagination|null
     * @throws InvalidConfigException
     */
    public function getPagination()
    {
        if ($this->_pagination === null) {
            $this->setPagination([]);
        }

        return $this->_pagination;
    }

    /**
     * @param  array|bool|SeekPagination  $value
     * @throws InvalidConfigException
     */
    public function setPagination($value)
    {
        if (is_array($value)) {
            $config = ['class' => SeekPagination::class];
            if ($this->id !== null) {
                $config['pageParam'] = $this->id.'-page';
                $config['pageSizeParam'] = $this->id.'-per-page';
            }
            $this->_pagination = Yii::createObject(array_merge($config, $value));
        } elseif ($value instanceof SeekPagination || $value === false) {
            $this->_pagination = $value;
        } else {
            throw new InvalidArgumentException('Only Pagination instance, configuration array or false is allowed.');
        }
    }
}
