<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Schedule;
use App\Models\Dentist;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function index()
    {
        $today = Carbon::now()->format('l'); // Get today's day of the week (e.g., "Monday")

        return Inertia::render('Schedules/Index', [
            'filters' => request()->all('search', 'trashed'),
            'schedules' => Schedule::orderBy('day_of_week')
                ->filter(request()->only('search', 'trashed'))
                ->paginate()
                ->withQueryString()
                ->through(fn ($schedule) => [
                    'id' => $schedule->id,
                    'day_of_week' => $schedule->day_of_week,
                    'start_time' => $schedule->start_time,
                    'end_time' => $schedule->end_time,
                    'break_start' => $schedule->break_start,
                    'break_end' => $schedule->break_end,
                    'dentist' => $schedule->dentist->name,
                    'created_at' => $schedule->created_at,
                    'is_available_today' => $schedule->isAvailableOnDay($today), // Check if available today
                ]),
        ]);
    }

    public function create()
    {
        $dentist = Dentist::where('user_id', auth()->id())->first();

        return Inertia::render('Schedules/Create', [
            'dentist' => $dentist
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'dentist_id' => 'required|exists:dentists,id',
            'days_of_week' => 'required|array', // Ensure it's an array
            'days_of_week.*' => 'string|in:Monday,Tuesday,Wednesday,Thursday,Friday,Saturday,Sunday', // Validate each day
            'start_time' => 'required|date_format:H:i',
            'end_time' => 'required|date_format:H:i|after:start_time',
            'break_start' => 'nullable|date_format:H:i',
            'break_end' => 'nullable|date_format:H:i|after:break_start',
        ]);

        // Ensure 'days_of_week' is stored as a JSON string (if stored in a JSON/text column)
        $schedule = Schedule::updateOrCreate(
            ['dentist_id' => $request->dentist_id],
            [
                'days_of_week' => json_encode($request->days_of_week), // Convert array to JSON
                'start_time' => $request->start_time,
                'end_time' => $request->end_time,
                'break_start' => $request->break_start,
                'break_end' => $request->break_end,
            ]
        );

        return redirect()->route('schedules.create')->with('success', 'Schedule saved successfully!');
    }
}