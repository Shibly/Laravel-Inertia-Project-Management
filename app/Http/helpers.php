<?php

use App\Models\Option;
use App\Models\Project;
use App\Models\Task;


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


if (!function_exists('getTasksSummary')) {
    function getTasksSummary(): array
    {
        $statuses = ['pending', 'in_progress', 'completed', 'on_hold', 'cancelled', 'revision'];
        $tasksSummary = [
            'total_tasks' => Task::count(),
        ];

        foreach ($statuses as $status) {
            $tasksSummary[$status] = Task::where('status', $status)->count();
        }

        return $tasksSummary;
    }
}


if (!function_exists('getProjectsSummary')) {
    function getProjectsSummary(): array
    {
        $statuses = ['pending', 'in_progress', 'completed', 'archived', 'on_hold'];
        $projectsSummary = [
            'total_projects' => Project::count()
        ];
        foreach ($statuses as $status) {
            $projectsSummary[$status] = Project::where('status', $status)->count();
        }

        return $projectsSummary;;
    }
}

