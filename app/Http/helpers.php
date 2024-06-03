<?php

use App\Models\Option;


function get_option($key)
{
    $system_settings = config('options');
    if ($key && isset($system_settings[$key])) {
        return $system_settings[$key];
    } else {
        return false;
    }
}


if (!function_exists('set_option')) {
    /**
     * Set a value for a given key in the options table.
     *
     * @param string $key
     * @param mixed $value
     * @return bool
     */
    function set_option(string $key, mixed $value): bool
    {

        $option = Option::where('key', $key)->first();

        if ($option) {
            $option->value = $value;
        } else {

            $option = new Option([
                'key' => $key,
                'value' => $value,
            ]);
        }

        // Save the option and return the success status
        return $option->save();
    }
}


