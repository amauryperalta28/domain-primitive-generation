using Wepsys.Core;

namespace RI.Novus.Core.Users;

/// <summary>
/// Represents User's DecimalSalaryMin
/// </summary>
public sealed class DecimalSalaryMin : ICoreDomainPrimitive<decimal>
{
	/// <summary>
	/// As primitive types are inlined by the compiler the coverlet tool does not catch a hit for 
	/// lines `private const decimal MinValue = 0.01M; and MaxValue.
	/// </summary>
	#pragma warning disable CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.
	private static readonly decimal MinValue = 12M;

	private static readonly decimal MaxValue = 99_999M;

	#pragma warning restore CA1802 //Field 'xxx' is 'readonly' but initialized with constant value. Use 'const' instead.

	/// <summary>
	/// Shortcut for constructor <see cref="DecimalSalaryMin"/>.
	/// <param name="decimalSalaryMin">Represents a decimalSalaryMin.</param>
	/// <returns>An instance of <see cref="DecimalSalaryMin"/></returns>
	/// </summary>
	public static readonly DecimalSalaryMin From(string decimalSalaryMin) => new(decimalSalaryMin);

	private DecimalSalaryMin(decimal rawDecimalSalaryMin)
	  => Value = Arguments.Between(rawDecimalSalaryMin, MinValue, MaxValue, nameof(rawDecimalSalaryMin), "Invalid value or format for User's DecimalSalaryMin");

	/// <summary>
	/// Gets property value
	/// </summary>
	public decimal Value { get; }

}
