<?php


namespace app\components;

use yii\data\Sort;
use yii\db\ActiveQuery;
use yii\db\Expression;
use yii\db\Query;

/**
 * Class SeekPagination
 * @package app\components
 */
class SeekPagination extends \yii\data\Pagination
{
    /**
     * @var string
     */
    public $seekParam = 'seek';

    public function applySeekCondition(ActiveQuery $query)
    {
        if ($this->isSeekPaginationRequested()) {
            $directions = array_unique(array_values($query->orderBy));
            if (count($directions) === 1) {
                if ($this->isSeekPaginationForward()) {
                    $way = $directions[0] === SORT_DESC ? '<' : '>';
                } else {
                    $this->reverseQueryOrders($query);
                    $way = $directions[0] === SORT_DESC ? '>' : '<';
                }
                $this->addCondition($query, $way);
                return true;
            }
            // TODO: доработать варианты использования с разной направленностью сортировки по двум и более полям
        }
        return false;
    }

    /**
     * @return bool
     */
    public function isSeekPaginationRequested()
    {
        return $this->getQueryParam($this->seekParam) === 'prev' || $this->getQueryParam($this->seekParam) === 'next';
    }

    /**
     * @return bool
     */
    public function isSeekPaginationForward()
    {
        return $this->getQueryParam($this->seekParam) === 'next';
    }

    public function addCondition(ActiveQuery $query, $way)
    {
        $params = [];

        foreach ($query->orderBy as $attribute => $direction) {
            $value = $this->getQueryParam($this->seekParam.'_'.$attribute);
            if ($value === 0 || $value === '0') {
                $params[$attribute] = 0;
            } elseif (!empty($value)) {
                $params[$attribute] = $value;
            }
        }

        if (count($params)) {

            $attributes = implode(', ', array_keys($params));

            $attributesParamName = implode(', ', array_map(static function ($attribute) {
                return ":$attribute";
            }, array_keys($params)));

            $conditionParams = [];

            foreach ($params as $attribute => $value) {
                $conditionParams[":$attribute"] = $value;
            }

            $query->andWhere("($attributes) $way ($attributesParamName)", $conditionParams);
        }

    }

    protected function reverseQueryOrders(ActiveQuery $query)
    {
        foreach ($query->orderBy as &$value) {
            $value = $value === SORT_DESC ? SORT_ASC : SORT_DESC;
        }
    }

}
